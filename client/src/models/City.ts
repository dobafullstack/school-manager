interface City{
    name: string;
    key: string;
    district: {
        name: string;
        key: string;
    }[];
}

export default City;