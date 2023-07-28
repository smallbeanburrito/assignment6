/*********************************************************************************
 *  WEB422 – Assignment 5
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Keith Cao Student ID: 143332211 Date: July 15, 2023
 *  Vercel Link: https://assignment5-zeta.vercel.app/
 *
 ********************************************************************************/
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Form, Row, Col, Button } from "react-bootstrap";
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { addToHistory } from "@/lib/userData";

export default function Home() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchBy: false,
      geoLocation: "",
      medium: "",
      isOnView: false,
      isHighlight: false,
      q: "",
    },
  });

  var queryString = "";

  async function submitForm(data) {
    console.log(data);
    queryString += data.searchBy + "=true";
    if (data.geoLocation) {
      queryString += "&geoLocation=" + data.geoLocation;
    }
    if (data.medium) {
      queryString += "&medium=" + data.medium;
    }
    queryString += "&isOnView=" + data.isOnView;
    queryString += "&isHighlight=" + data.isHighlight;
    queryString += "&q=" + data.q;
    router.push(`/artwork?${queryString}`);
    setSearchHistory(await addToHistory(queryString));
  }
  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Search Query</Form.Label>
            <Form.Control
              className={errors.q ? "is-invalid" : ""}
              type="text"
              placeholder=""
              {...register("q", { required: true })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Form.Label>Search By</Form.Label>
          <Form.Select {...register("searchBy")} className="mb-3">
            <option value="title">Title</option>
            <option value="tags">Tags</option>
            <option value="artistOrCulture">Artist or Culture</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Geo Location</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              {...register("geoLocation")}
            />
            <Form.Text className="text-muted">
              Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;,
              &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.),
              with multiple values separated by the | operator
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Medium</Form.Label>
            <Form.Control type="text" placeholder="" {...register("medium")} />
            <Form.Text className="text-muted">
              Case Sensitive String (ie: &quot;Ceramics&quot;,
              &quot;Furniture&quot;, &quot;Paintings&quot;,
              &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple
              values separated by the | operator
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Check
            type="checkbox"
            label="Highlighted"
            {...register("isHighlight")}
          />
          <Form.Check
            type="checkbox"
            label="Currently on View"
            name="isOnView"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <br />
          <Button type="submit">Submit</Button>
        </Col>
      </Row>
    </Form>
  );
}
