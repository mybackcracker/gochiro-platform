import JsonLd from "./JsonLd";
import { pageSchema, type PageSchemaInput } from "@/lib/pageSchema";

export default function PageSearchSchema(props: PageSchemaInput) {
  return <JsonLd data={pageSchema(props)} />;
}
