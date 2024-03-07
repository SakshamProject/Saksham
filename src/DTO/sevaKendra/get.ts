import { SevaKendra } from "@prisma/client";
import { SevaKendraDisplay } from "../../models/sevaKendra/sevaKendra.js";
import {
  getContactPersonDB,
  getSevaKendraDB,
} from "../../services/database/sevaKendra/get.js";

const getSevaKendraDisplayObject = async () => {
  const sevaKendra:SevaKendra = await getSevaKendraDB();
    const contactPerson = await getContactPersonDB();
    const displayData: SevaKendraDisplay = {
        name:sevaKendra.name
    }
};
