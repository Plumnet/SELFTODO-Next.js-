import { Box, Text } from '@chakra-ui/react'
import { GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next';
import { getStaticProps } from 'next/dist/build/templates/pages';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

//https://qiita.com/hinako_n/items/d24488935d9bff19188f
// function ProductDetail() {
//     const router = useRouter()
//     console.log('router', router.query)
//     console.log(router.query.id)
// }

//https://zenn.dev/takuty/articles/0e5c19142a8018
type TestPageProps = InferGetStaticPropsType<typeof getStaticProps>;

//15行目とセット
const TestPage: NextPage<TestPageProps> = (props: TestPageProps) => {
    const { id, name, email } = props;

    //https://unblog.unreact.jp/blog/cdic_vz1_i5
    // export async function getStaticProps(context: any) {
    //     //contextパラメータのparamsを取り出す
    //     const { params } = context
    //     //params.postIdでパスを取得
    //     const res = await fetch(`https://jsonplaceholder.typicode.com/list/${params.postId}`)
    //     const data = await res.json()

    //     return {
    //         props: {
    //             post: data,
    //         },
    //     }
    // }

    //15、18行目とセット
    export const getStaticProps: GetStaticProps = async ({
        params,
    }: GetStaticPropsContext) => {
        const user: User = getUser(params!.id);

        return {
            props: {
                id: user.id,
                name: user.username,
                email: user.email,
            },
        };
    };

    export default TestPage;


    //https://unblog.unreact.jp/blog/cdic_vz1_i5
    export const getStaticPaths: GetStaticPaths = async () => {
        //blogのデータ全部くれ
        const data: Data = await client.get({ endpoint: "blog" });
        //アクセスしうるページのパスの入ったオブジェクトの配列としてまとめておく
        const pathList = data.contents.map((Blog) => {
            return {
                params: {
                    id: Blog.id,
                },
            };
        });

        return {
            paths: pathList,
            //アクセスしうるパス以外のパスに対するアクセスの対処
            fallback: false,
        };
    };

    //https://qiita.com/hinako_n/items/d24488935d9bff19188f
    // const router = useRouter()

    //75行目とセットの箇所
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
