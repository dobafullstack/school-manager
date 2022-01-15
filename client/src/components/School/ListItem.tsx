import { Flex, Skeleton, Text } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { School } from '../../graphql/generated/graphql';
import formatDate from '../../helpers/formatDate';
import City from '../../models/City';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

interface Props {
    item: School;
    cities: City[];
}

export default function ListItem({ item, cities }: Props): ReactElement {
    const city = cities.find((city) => city.key === item.city);
    const district = city && city.district.find((dis) => dis.key === item.district);

    return (
        <Skeleton isLoaded={city !== undefined} rounded="xl">
            <ContextMenuTrigger id="school_manager" attributes={{id: item.id}}>
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
                    cursor="pointer"
                    transition='all 0.5s'
                    id={item.id}
                    _hover={{
                        backgroundColor: 'gray.100'
                    }}
                >
                    <Text minW="300px" id={item.id}>{item.name}</Text>
                    <Text id={item.id}>{city?.name}</Text>
                    <Text id={item.id}>{district?.name}</Text>
                    <Text id={item.id}>{formatDate(item.createdAt)}</Text>
                    <Text id={item.id}>{formatDate(item.updatedAt)}</Text>
                </Flex>
            </ContextMenuTrigger>
        </Skeleton>
    );
}
