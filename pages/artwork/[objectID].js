import ArtworkCardDetail from "@/components/ArtworkCardDetail";
import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap";

export default function Home() {
  const router = useRouter();
  const { objectID } = router.query;
  return (
    <Row>
      <Col>
        <ArtworkCardDetail objectID={objectID} />
      </Col>
    </Row>
  );
}
