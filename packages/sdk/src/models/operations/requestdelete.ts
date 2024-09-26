/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";

/**
 * An object describing the reason why the User account is being deleted.
 */
export type RequestDeleteReasons = {
  /**
   * Idenitifier slug of the reason why the User account is being deleted.
   */
  slug: string;
  /**
   * Description of the reason why the User account is being deleted.
   */
  description: string;
};

export type RequestDeleteRequestBody = {
  /**
   * Optional array of objects that describe the reason why the User account is being deleted.
   */
  reasons?: Array<RequestDeleteReasons> | undefined;
};

/**
 * Response indicating that the User deletion process has been initiated, and a confirmation email has been sent.
 */
export type RequestDeleteResponseBody = {
  /**
   * Unique identifier of the User who has initiated deletion.
   */
  id: string;
  /**
   * Email address of the User who has initiated deletion.
   */
  email: string;
  /**
   * User deletion progress status.
   */
  message: string;
};

/** @internal */
export const RequestDeleteReasons$inboundSchema: z.ZodType<
  RequestDeleteReasons,
  z.ZodTypeDef,
  unknown
> = z.object({
  slug: z.string(),
  description: z.string(),
});

/** @internal */
export type RequestDeleteReasons$Outbound = {
  slug: string;
  description: string;
};

/** @internal */
export const RequestDeleteReasons$outboundSchema: z.ZodType<
  RequestDeleteReasons$Outbound,
  z.ZodTypeDef,
  RequestDeleteReasons
> = z.object({
  slug: z.string(),
  description: z.string(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace RequestDeleteReasons$ {
  /** @deprecated use `RequestDeleteReasons$inboundSchema` instead. */
  export const inboundSchema = RequestDeleteReasons$inboundSchema;
  /** @deprecated use `RequestDeleteReasons$outboundSchema` instead. */
  export const outboundSchema = RequestDeleteReasons$outboundSchema;
  /** @deprecated use `RequestDeleteReasons$Outbound` instead. */
  export type Outbound = RequestDeleteReasons$Outbound;
}

/** @internal */
export const RequestDeleteRequestBody$inboundSchema: z.ZodType<
  RequestDeleteRequestBody,
  z.ZodTypeDef,
  unknown
> = z.object({
  reasons: z.array(z.lazy(() => RequestDeleteReasons$inboundSchema)).optional(),
});

/** @internal */
export type RequestDeleteRequestBody$Outbound = {
  reasons?: Array<RequestDeleteReasons$Outbound> | undefined;
};

/** @internal */
export const RequestDeleteRequestBody$outboundSchema: z.ZodType<
  RequestDeleteRequestBody$Outbound,
  z.ZodTypeDef,
  RequestDeleteRequestBody
> = z.object({
  reasons: z.array(z.lazy(() => RequestDeleteReasons$outboundSchema))
    .optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace RequestDeleteRequestBody$ {
  /** @deprecated use `RequestDeleteRequestBody$inboundSchema` instead. */
  export const inboundSchema = RequestDeleteRequestBody$inboundSchema;
  /** @deprecated use `RequestDeleteRequestBody$outboundSchema` instead. */
  export const outboundSchema = RequestDeleteRequestBody$outboundSchema;
  /** @deprecated use `RequestDeleteRequestBody$Outbound` instead. */
  export type Outbound = RequestDeleteRequestBody$Outbound;
}

/** @internal */
export const RequestDeleteResponseBody$inboundSchema: z.ZodType<
  RequestDeleteResponseBody,
  z.ZodTypeDef,
  unknown
> = z.object({
  id: z.string(),
  email: z.string(),
  message: z.string(),
});

/** @internal */
export type RequestDeleteResponseBody$Outbound = {
  id: string;
  email: string;
  message: string;
};

/** @internal */
export const RequestDeleteResponseBody$outboundSchema: z.ZodType<
  RequestDeleteResponseBody$Outbound,
  z.ZodTypeDef,
  RequestDeleteResponseBody
> = z.object({
  id: z.string(),
  email: z.string(),
  message: z.string(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace RequestDeleteResponseBody$ {
  /** @deprecated use `RequestDeleteResponseBody$inboundSchema` instead. */
  export const inboundSchema = RequestDeleteResponseBody$inboundSchema;
  /** @deprecated use `RequestDeleteResponseBody$outboundSchema` instead. */
  export const outboundSchema = RequestDeleteResponseBody$outboundSchema;
  /** @deprecated use `RequestDeleteResponseBody$Outbound` instead. */
  export type Outbound = RequestDeleteResponseBody$Outbound;
}
