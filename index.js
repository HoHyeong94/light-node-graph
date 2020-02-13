import { add, minus } from "./a/chunk0";
import { Main } from "./testP/mainFunction";
import {defaultValues} from "./testP/defaultValues"

const {
   horizon, vertical, superElevation, girderLayoutInput, SEShape, girderBaseInfo, xbeamLayout, xbeamSectionList, diaphragmLayout,
    diaphragmSectionList, vStiffLayout, vStiffSectionList, hBracingLayout, hBracingSectionList
} = defaultValues

export default function main() {
  let linedata = Main(
     horizon, vertical, superElevation, girderLayoutInput, SEShape, girderBaseInfo, xbeamLayout, xbeamSectionList, diaphragmLayout,
    diaphragmSectionList, vStiffLayout, vStiffSectionList, hBracingLayout, hBracingSectionList
  );
  const a = add(1, 13)
  const b = minus(31, 2)
  return { a, b, linedata }
}