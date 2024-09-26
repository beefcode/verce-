/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";

/**
 * Data representing a Team.
 */
export type Team = {};

/** @internal */
export const Team$inboundSchema: z.ZodType<Team, z.ZodTypeDef, unknown> = z
  .object({});

/** @internal */
export type Team$Outbound = {};

/** @internal */
export const Team$outboundSchema: z.ZodType<Team$Outbound, z.ZodTypeDef, Team> =
  z.object({});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Team$ {
  /** @deprecated use `Team$inboundSchema` instead. */
  export const inboundSchema = Team$inboundSchema;
  /** @deprecated use `Team$outboundSchema` instead. */
  export const outboundSchema = Team$outboundSchema;
  /** @deprecated use `Team$Outbound` instead. */
  export type Outbound = Team$Outbound;
}
