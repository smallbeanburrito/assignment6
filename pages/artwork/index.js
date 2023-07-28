import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Col, Pagination } from "react-bootstrap";
import Error from "next/error";
import ArtworkCard from "@/components/ArtworkCard";
import useSWR from "swr";
import validObjectIDList from "@/public/data/validObjectIDList";

var PER_PAGE = 12;

export default function Home() {
  const [artworkList, setArtworkList] = useState();
  const [page, setPage] = useState(1);

  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  function previousPage() {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }
  function nextPage() {
    if (page < artworkList.length) {
      setPage((prev) => prev + 1);
    }
  }

  useEffect(() => {
    if (data) {
      let filteredResults = validObjectIDList.objectIDs.filter((x) =>
        data.objectIDs?.includes(x)
      );
      var results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }

      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  if (error) {
    return <Error statusCode={404} />;
  }
  if (artworkList?.length > 0) {
    return (
      <>
        <Row className="gy-4">
          {artworkList[page - 1].map((data) => (
            <Col lg={3} key={data}>
              <ArtworkCard objectID={data} />
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item> {page} </Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      </>
    );
  }

  if (artworkList?.length == 0)
    return (
      <div>
        <h4>Nothing Here</h4>Try searching for something else.
      </div>
    );

  return null;
}
