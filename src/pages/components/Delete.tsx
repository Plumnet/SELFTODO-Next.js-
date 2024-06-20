import { Button } from '@chakra-ui/react'
import React from 'react'

function Delete({ handleDelete, todo }: any) {

    return (
        <Button colorScheme='teal' variant='outline' size='sm' onClick={() => handleDelete(todo)}>削除</Button>
    )
}

export default Delete