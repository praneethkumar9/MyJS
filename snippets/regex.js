/* eslint-disable no-useless-escape */
export const alphanumericPattern = /[a-zA-Z0-9 ]+$/;
export const urlPattern = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*)$/g;
export const emailPattern =  /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
export const numericPattern =  /^\d+$/;
export const alphabetsPattern =  /^[A-Za-z0-9 _-]+$/;
export const mobilePattern =  /^(\+91|0)?\s?\d{10}$/; //Regular expression check has to have an optional +91 or 0 in the beginning, then an optional space and 10 digits
