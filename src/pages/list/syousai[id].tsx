import { Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

// function ProductDetail() {
//     const router = useRouter()
//     console.log('router', router.query)
//     console.log(router.query.id)
// }

export async function getStaticProps(context: any) {
    //contextパラメータのparamsを取り出す
    const { params } = context
    //params.postIdでパスを取得
    const res = await fetch(`https://jsonplaceholder.typicode.com/list/${params.postId}`)
    const data = await res.json()

    return {
        props: {
            post: data,
        },
    }
}

// const router = useRouter()

// useEffect(() => {
//     const routeId = router.query.id
//     console.log(routeId)
// }, [router])

// ProductDetail()

const innerBoxStyles = {
    p: '5',
    backgroundImage:
        'url(https://media.loom-app.com/lifehacker/dist/images/2013/04/130413_sc.jpg?w=1200) ',
}



export default function Syousai() {
    return (
        <div>
            <Box sx={innerBoxStyles}>
                <Text fontSize={32} color='White' textAlign={['left']}>
                    詳細画面
                </Text>
            </Box>
            <h1>
            </h1>
        </div>
    )
}
