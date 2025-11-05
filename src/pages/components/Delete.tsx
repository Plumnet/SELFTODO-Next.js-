import { Button } from '@chakra-ui/react'

function Delete({ handleDelete, todo }: any) {
    return (
        <Button
            colorScheme='red'
            variant='outline'
            size='sm'
            onClick={() => handleDelete(todo.docId)}
        >
            削除
        </Button>
    )
}

export default Delete