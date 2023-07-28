import useSWR from "swr";
import Error from "next/error";
import Link from "next/link";
import { Card, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState, useEffect } from "react";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function ArtworkCardDetail(props) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(props.objectID));
  }, [favouritesList]);

  async function favouritesClicked() {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(props.objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(await addToFavourites(props.objectID));
      setShowAdded(true);
    }
  }

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
        {data.primaryImage ? <Card.Img src={data.primaryImage} /> : ""}
        <Card.Body>
          <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
          <Card.Text>
            <strong>Date: </strong>
            {data.objectDate ? data.objectDate : " N/A"} <br />
            <strong>Classification: </strong>
            {data.classification ? data.classification : " N/A"} <br />
            <strong>Medium: </strong>
            {data.medium ? data.medium : " N/A"} <br />
            <br />
            <strong>Artist: </strong>
            {data.artistDisplayName ? data.artistDisplayName : "N/A"}&nbsp;
            {data.artistDisplayName ? (
              <a
                href={data.artistWikidata_URL}
                target="_blank"
                rel="noreferrer"
              >
                (wiki)
              </a>
            ) : (
              ""
            )}
            <br />
            <strong>Credit Line: </strong>
            {data.creditLine ? data.creditLine : "N/A"}
            <br />
            <strong>Dimesions: </strong>
            {data.dimensions ? data.dimensions : "N/A"}
            <br /> <br />
            <button
              variant={showAdded ? "primary" : "outline-primary"}
              onClick={favouritesClicked}
            >
              {showAdded ? "+ Favourite (added)" : "+ Favourite"}
            </button>
          </Card.Text>
          <Link href={"/artwork/" + data.objectID} passHref>
            <Button variant="primary">{data.objectID}</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
