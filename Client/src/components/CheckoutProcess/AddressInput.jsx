import React from "react";
import { useFormContext, Controller} from "react-hook-form";
import Grid from '@mui/material/Grid';
import {TextField} from '@mui/material';




const AddressInput = ({name, label, required}) => {
   
        const { control } = useFormContext();
           const isError = false;

    return (
        <Grid item  xs={12} sm={6}>
            
            <Controller
                control={control}
                name={name}
                defaultValue=""
                required={required}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="outlined-required"
                        label={label}
                    />
                )}
                rules={{ required: true }}
            />
             
        </Grid>
    
    )
  }
  
  export default AddressInput 

  

  