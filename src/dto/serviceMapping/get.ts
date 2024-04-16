import { generateServiceMappingFilter } from "../../services/database/utils/serviceMapping/filterMapper.js";
import {
  ServiceMappingWhere,
  serviceMappingFilterType,
} from "../../types/serviceMapping/serviceMappingScreens.js";

const createServiceMappingFilterInputObject = (
  serviceMappingFilter: serviceMappingFilterType | undefined,
  globalSearchConditions: ServiceMappingWhere | null
): ServiceMappingWhere => {
  const serviceMappingWhereInput = generateServiceMappingFilter(
    serviceMappingFilter,
    globalSearchConditions
  );
  return serviceMappingWhereInput;
};

export { createServiceMappingFilterInputObject };
