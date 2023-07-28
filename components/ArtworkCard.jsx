import useSWR from "swr";
import Error from "next/error";
import Link from "next/link";
import { Card, Button } from "react-bootstrap";

export default function ArtworkCard(props) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
  );

  if (error) {
    return <Error statusCode={404} />;
  }
  if (data) {
    if (data.length < 1) {
      return null;
    }

    return (
      <Card>
        <Card.Img
          src={
            data.primaryImageSmall
              ? data.primaryImageSmall
              : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
          }
        />
        <Card.Body>
          <Card.Title>{data.title ? data.title : " N/A"}</Card.Title>
          <Card.Text>
            <strong>Date: </strong>
            {data.objectDate ? data.objectDate : " N/A"} <br />
            <strong>Classification: </strong>
            {data.classification ? data.classification : " N/A"} <br />
            <strong>Medium: </strong>
            {data.medium ? data.medium : " N/A"}
          </Card.Text>
          <Link href={"/artwork/" + data.objectID} passHref>
            <Button variant="primary">{data.objectID}</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
