import { Box, Flex, Link } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import NextLink from 'next/link'

interface Props {
    
}

export default function Navbar({}: Props): ReactElement {
    return (
        <Box bg="primary.200" width="100%">
            <Flex>
                <NextLink href="/" passHref>
                    <Link>Home</Link>
                </NextLink>
                <Box>
                    <NextLink href="/login" passHref>
                        <Link>Login</Link>
                    </NextLink>
                </Box>
            </Flex>
        </Box>
    );
}
