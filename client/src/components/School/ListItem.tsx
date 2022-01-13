import { Flex, Text } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { School } from '../../graphql/generated/graphql';
import formatDate from '../../helpers/formatDate';
import City from '../../models/City';

interface Props {
    item: School;
    cities: City[];
}

export default function ListItem({ item, cities }: Props): ReactElement {
    const city = cities.find((city) => city.key === item.city);
    const district = city.district.find((dis) => dis.key === item.district);

    return (
        <Flex
            bg="white"
            w="100%"
            justify="space-between"
            shadow="lg"
            mb={4}
            minH="70px"
            align="center"
            rounded="xl"
            px={10}
        >
            <Text minW="300px">{item.name}</Text>
            <Text>{city.name}</Text>
            <Text>{district.name}</Text>
            <Text>{formatDate(item.createdAt)}</Text>
            <Text>{formatDate(item.updatedAt)}</Text>
        </Flex>
    );
}
