declare module 'country-list' {
  export function getNames(): string[];
  export function getCodes(): string[];
  export function getName(code: string): string | undefined;
  export function getCode(name: string): string | undefined;
  export function getNames(): string[];
  export function getCodes(): string[];
  export function getData(): { name: string; code: string }[];
  
  const countryList: {
    getNames: typeof getNames;
    getCodes: typeof getCodes;
    getName: typeof getName;
    getCode: typeof getCode;
    getData: typeof getData;
  };
  
  export default countryList;
}
