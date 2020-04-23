import React, { useEffect, useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

interface PlaceType {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings: [
      {
        offset: number;
        length: number;
      },
    ];
  };
}

const autocompleteService = { current: null };
const detailsService = { current: null };

export default () => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<PlaceType[]>([]);
  const loaded = useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyDDXMCdsc5wa6et-O8M86J3Qjt55txPS3s&libraries=places',
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const fetch = React.useMemo(
    () =>
      throttle(
        (request: { 
          input: string, 
          sessionToken: any,
          radius: number,
          location:  google.maps.LatLng,
          strictbounds: boolean
          }, 
          callback: (results?: PlaceType[]) => void) => {
            console.log(request);
            (autocompleteService.current as any).getPlacePredictions(request, callback);
          }, 200),
    [],
  );

  useEffect(() => {

    const getAutocompleteAsync = async() => {

      let active = true;

      if (!autocompleteService.current && (window as any).google) {
        autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
      }

      if (!autocompleteService.current) {
        return undefined;
      }

      if (inputValue === '') {
        setOptions([]);
        return undefined;
      }

      const sessionToken = new google.maps.places.AutocompleteSessionToken();
      const location = new google.maps.LatLng(51.154438, -114.06845);
      fetch({ input: inputValue, 
              sessionToken,
              radius: 50000, 
              location: location, 
              strictbounds: true }, 
        (results?: PlaceType[]) => {
        if (active) {
          console.log(results);
          setOptions(results || []);
        }
      });

      return () => {
        active = false;
      };
    }
    getAutocompleteAsync();
  }, [inputValue, fetch]);

  return (
    <Autocomplete
      id="google-map-demo"
      style={{ width: 300 }}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      renderInput={(params) => (
        <TextField
          {...params}
          label="Add a location"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
      )}
      renderOption={(option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length]),
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part:any, index: number) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}
              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );

    };

