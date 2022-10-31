import { useRouter } from 'next/router'
import Axios from "axios";
import Item from "../../src/component/Item";
import Head from "next/head";

export default function Id( { item }) {
  const router = useRouter()
  const { id } = router.query
  return (
    <div>
      {item && (
        <div>
          <Head>
            <title>{item.name}</title>
            <meta name="description" content={item.description}></meta>
          </Head>
          <Item item={item} />
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
  const res = await Axios.get(apiUrl);
  const data = res.data;

  return {
    props: {
      item: data,
    },
  };
}