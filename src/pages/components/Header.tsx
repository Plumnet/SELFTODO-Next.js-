import { Box, Text } from '@chakra-ui/react'
import React from 'react'

export default function Header() {
    return (
        <div>
            <Box sx={innerBoxStyles}>
                <Text fontSize={32} color='Yellow' textAlign={['left']}>
                    作成画面
                </Text>
            </Box>
        </div>
    )
}
