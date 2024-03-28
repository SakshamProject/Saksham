import { z } from "zod";

const stateSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
});
type state = z.infer<typeof stateSchema>;

const districtSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  stateId: z.string(),
});
type district = z.infer<typeof districtSchema>;

const corporationSchema = z.object({
  name: z.string(),
  districtId: z.string(),
});
type corporation = z.infer<typeof corporationSchema>;

const municipalitySchema = z.object({
  name: z.string(),
  districtId: z.string(),
});
type municipality = z.infer<typeof municipalitySchema>;

const MPConstituencySchema = z.object({
  name: z.string(),
  districtId: z.string(),
});
type MPConstituency = z.infer<typeof MPConstituencySchema>;

const MLAConstituencySchema = z.object({
  name: z.string(),
  districtId: z.string(),
});
type MLAConstituency = z.infer<typeof MLAConstituencySchema>;

const panchayatUnionSchema = z.object({
  name: z.string(),
  districtId: z.string(),
});
type panchayatUnion = z.infer<typeof panchayatUnionSchema>;

const townPanchayatSchema = z.object({
  name: z.string(),
  districtId: z.string(),
});
type townPanchayat = z.infer<typeof townPanchayatSchema>;

export {
  stateSchema,
  districtSchema,
  corporationSchema,
  municipalitySchema,
  MLAConstituencySchema,
  MPConstituencySchema,
  townPanchayatSchema,
  panchayatUnionSchema,
  state,
  district,
  corporation,
  municipality,
  MLAConstituency,
  MPConstituency,
  townPanchayat,
  panchayatUnion,
};
