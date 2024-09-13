"use client";

import {useState} from 'react';

export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function(event) {
      console.log("event.target.id")
      console.log(event.target.id)
      console.log("event.target.value")
      console.log(event.target.value)
      setValues({
        ...fields,
        [event.target.id]: event.target.value
      });
    }
  ];
}