import { Box, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    params: { todoId: number };
}

const innerBoxStyles = {
    p: '5',
    backgroundImage:
        'url(https://media.loom-app.com/lifehacker/dist/images/2013/04/130413_sc.jpg?w=1200) ',
}



export default function Syousai(props: Props) {
    return (
        <div>
            <Box sx={innerBoxStyles}>
                <Text fontSize={32} color='White' textAlign={['left']}>
                    詳細画面
                </Text>
            </Box>
            <h1>
                {props.params.todoId}
            </h1>
        </div>
    )
}
