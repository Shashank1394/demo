// Below are built-in components that are available in the app, it's recommended to keep them as is

import {
  BYOCServerWrapper,
  NextjsContentSdkComponent,
  FEaaSServerWrapper,
} from "@sitecore-content-sdk/nextjs";
import { Form } from "@sitecore-content-sdk/nextjs";

// end of built-in components
import * as PartialDesignDynamicPlaceholder from "src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder";
import * as cardgridprops from "src/components/card-grid/card-grid.props";
import * as CardGrid from "src/components/card-grid/CardGrid";
import * as CardDetails from "src/components/card-details/CardDetails";

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ["BYOCWrapper", BYOCServerWrapper],
  ["FEaaSWrapper", FEaaSServerWrapper],
  ["Form", { ...Form, componentType: "client" }],
  ["PartialDesignDynamicPlaceholder", { ...PartialDesignDynamicPlaceholder }],
  ["card-grid", { ...cardgridprops }],
  ["CardGrid", { ...CardGrid }],
  ["CardDetails", { ...CardDetails }],
]);

export default componentMap;
