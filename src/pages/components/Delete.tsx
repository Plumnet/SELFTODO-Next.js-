import db from '@/firebase';
import { Button } from '@chakra-ui/react'
import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react'

function Delete({ handleDelete, todo }: any) {

    async function red() {
        await deleteDoc(doc(db, "cities", "DC"));
    }

    return (
        <Button colorScheme='teal' variant='outline' size='sm' onClick={() => handleDelete(todo.docId)}>削除</Button>
    )
}

export default Delete