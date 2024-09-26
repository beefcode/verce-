/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { ClosedEnum } from "../../types/enums.js";

export const QueryParamProvider = {
  Github: "github",
  GithubCustomHost: "github-custom-host",
  Gitlab: "gitlab",
  Bitbucket: "bitbucket",
} as const;
export type QueryParamProvider = ClosedEnum<typeof QueryParamProvider>;

export type SearchRepoRequest = {
  query?: string | undefined;
  namespaceId?: string | undefined;
  provider?: QueryParamProvider | undefined;
  installationId?: string | undefined;
  /**
   * The custom Git host if using a custom Git provider, like GitHub Enterprise Server
   */
  host?: string | undefined;
  /**
   * The Team identifier to perform the request on behalf of.
   */
  teamId?: string | undefined;
  /**
   * The Team slug to perform the request on behalf of.
   */
  slug?: string | undefined;
};

export const SearchRepoProvider = {
  Github: "github",
  GithubCustomHost: "github-custom-host",
  Gitlab: "gitlab",
  Bitbucket: "bitbucket",
} as const;
export type SearchRepoProvider = ClosedEnum<typeof SearchRepoProvider>;

export type NamespaceId = string | number;

export type GitAccount = {
  provider: SearchRepoProvider;
  namespaceId: string | number | null;
};

export type SearchRepoId = string | number;

export const SearchRepoIntegrationsProvider = {
  Github: "github",
  GithubCustomHost: "github-custom-host",
  Gitlab: "gitlab",
  Bitbucket: "bitbucket",
} as const;
export type SearchRepoIntegrationsProvider = ClosedEnum<
  typeof SearchRepoIntegrationsProvider
>;

export type SearchRepoIntegrationsId = string | number;

export type Owner = {
  id: string | number;
  name: string;
};

export const OwnerType = {
  User: "user",
  Team: "team",
} as const;
export type OwnerType = ClosedEnum<typeof OwnerType>;

export type Repos = {
  id: string | number;
  provider: SearchRepoIntegrationsProvider;
  url: string;
  name: string;
  slug: string;
  namespace: string;
  owner: Owner;
  ownerType: OwnerType;
  private: boolean;
  defaultBranch: string;
  updatedAt: number;
};

export type SearchRepoResponseBody = {
  gitAccount: GitAccount;
  repos: Array<Repos>;
};

/** @internal */
export const QueryParamProvider$inboundSchema: z.ZodNativeEnum<
  typeof QueryParamProvider
> = z.nativeEnum(QueryParamProvider);

/** @internal */
export const QueryParamProvider$outboundSchema: z.ZodNativeEnum<
  typeof QueryParamProvider
> = QueryParamProvider$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace QueryParamProvider$ {
  /** @deprecated use `QueryParamProvider$inboundSchema` instead. */
  export const inboundSchema = QueryParamProvider$inboundSchema;
  /** @deprecated use `QueryParamProvider$outboundSchema` instead. */
  export const outboundSchema = QueryParamProvider$outboundSchema;
}

/** @internal */
export const SearchRepoRequest$inboundSchema: z.ZodType<
  SearchRepoRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  query: z.string().optional(),
  namespaceId: z.string().optional(),
  provider: QueryParamProvider$inboundSchema.optional(),
  installationId: z.string().optional(),
  host: z.string().optional(),
  teamId: z.string().optional(),
  slug: z.string().optional(),
});

/** @internal */
export type SearchRepoRequest$Outbound = {
  query?: string | undefined;
  namespaceId?: string | undefined;
  provider?: string | undefined;
  installationId?: string | undefined;
  host?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

/** @internal */
export const SearchRepoRequest$outboundSchema: z.ZodType<
  SearchRepoRequest$Outbound,
  z.ZodTypeDef,
  SearchRepoRequest
> = z.object({
  query: z.string().optional(),
  namespaceId: z.string().optional(),
  provider: QueryParamProvider$outboundSchema.optional(),
  installationId: z.string().optional(),
  host: z.string().optional(),
  teamId: z.string().optional(),
  slug: z.string().optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace SearchRepoRequest$ {
  /** @deprecated use `SearchRepoRequest$inboundSchema` instead. */
  export const inboundSchema = SearchRepoRequest$inboundSchema;
  /** @deprecated use `SearchRepoRequest$outboundSchema` instead. */
  export const outboundSchema = SearchRepoRequest$outboundSchema;
  /** @deprecated use `SearchRepoRequest$Outbound` instead. */
  export type Outbound = SearchRepoRequest$Outbound;
}

/** @internal */
export const SearchRepoProvider$inboundSchema: z.ZodNativeEnum<
  typeof SearchRepoProvider
> = z.nativeEnum(SearchRepoProvider);

/** @internal */
export const SearchRepoProvider$outboundSchema: z.ZodNativeEnum<
  typeof SearchRepoProvider
> = SearchRepoProvider$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace SearchRepoProvider$ {
  /** @deprecated use `SearchRepoProvider$inboundSchema` instead. */
  export const inboundSchema = SearchRepoProvider$inboundSchema;
  /** @deprecated use `SearchRepoProvider$outboundSchema` instead. */
  export const outboundSchema = SearchRepoProvider$outboundSchema;
}

/** @internal */
export const NamespaceId$inboundSchema: z.ZodType<
  NamespaceId,
  z.ZodTypeDef,
  unknown
> = z.union([z.string(), z.number()]);

/** @internal */
export type NamespaceId$Outbound = string | number;

/** @internal */
export const NamespaceId$outboundSchema: z.ZodType<
  NamespaceId$Outbound,
  z.ZodTypeDef,
  NamespaceId
> = z.union([z.string(), z.number()]);

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace NamespaceId$ {
  /** @deprecated use `NamespaceId$inboundSchema` instead. */
  export const inboundSchema = NamespaceId$inboundSchema;
  /** @deprecated use `NamespaceId$outboundSchema` instead. */
  export const outboundSchema = NamespaceId$outboundSchema;
  /** @deprecated use `NamespaceId$Outbound` instead. */
  export type Outbound = NamespaceId$Outbound;
}

/** @internal */
export const GitAccount$inboundSchema: z.ZodType<
  GitAccount,
  z.ZodTypeDef,
  unknown
> = z.object({
  provider: SearchRepoProvider$inboundSchema,
  namespaceId: z.nullable(z.union([z.string(), z.number()])),
});

/** @internal */
export type GitAccount$Outbound = {
  provider: string;
  namespaceId: string | number | null;
};

/** @internal */
export const GitAccount$outboundSchema: z.ZodType<
  GitAccount$Outbound,
  z.ZodTypeDef,
  GitAccount
> = z.object({
  provider: SearchRepoProvider$outboundSchema,
  namespaceId: z.nullable(z.union([z.string(), z.number()])),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace GitAccount$ {
  /** @deprecated use `GitAccount$inboundSchema` instead. */
  export const inboundSchema = GitAccount$inboundSchema;
  /** @deprecated use `GitAccount$outboundSchema` instead. */
  export const outboundSchema = GitAccount$outboundSchema;
  /** @deprecated use `GitAccount$Outbound` instead. */
  export type Outbound = GitAccount$Outbound;
}

/** @internal */
export const SearchRepoId$inboundSchema: z.ZodType<
  SearchRepoId,
  z.ZodTypeDef,
  unknown
> = z.union([z.string(), z.number()]);

/** @internal */
export type SearchRepoId$Outbound = string | number;

/** @internal */
export const SearchRepoId$outboundSchema: z.ZodType<
  SearchRepoId$Outbound,
  z.ZodTypeDef,
  SearchRepoId
> = z.union([z.string(), z.number()]);

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace SearchRepoId$ {
  /** @deprecated use `SearchRepoId$inboundSchema` instead. */
  export const inboundSchema = SearchRepoId$inboundSchema;
  /** @deprecated use `SearchRepoId$outboundSchema` instead. */
  export const outboundSchema = SearchRepoId$outboundSchema;
  /** @deprecated use `SearchRepoId$Outbound` instead. */
  export type Outbound = SearchRepoId$Outbound;
}

/** @internal */
export const SearchRepoIntegrationsProvider$inboundSchema: z.ZodNativeEnum<
  typeof SearchRepoIntegrationsProvider
> = z.nativeEnum(SearchRepoIntegrationsProvider);

/** @internal */
export const SearchRepoIntegrationsProvider$outboundSchema: z.ZodNativeEnum<
  typeof SearchRepoIntegrationsProvider
> = SearchRepoIntegrationsProvider$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace SearchRepoIntegrationsProvider$ {
  /** @deprecated use `SearchRepoIntegrationsProvider$inboundSchema` instead. */
  export const inboundSchema = SearchRepoIntegrationsProvider$inboundSchema;
  /** @deprecated use `SearchRepoIntegrationsProvider$outboundSchema` instead. */
  export const outboundSchema = SearchRepoIntegrationsProvider$outboundSchema;
}

/** @internal */
export const SearchRepoIntegrationsId$inboundSchema: z.ZodType<
  SearchRepoIntegrationsId,
  z.ZodTypeDef,
  unknown
> = z.union([z.string(), z.number()]);

/** @internal */
export type SearchRepoIntegrationsId$Outbound = string | number;

/** @internal */
export const SearchRepoIntegrationsId$outboundSchema: z.ZodType<
  SearchRepoIntegrationsId$Outbound,
  z.ZodTypeDef,
  SearchRepoIntegrationsId
> = z.union([z.string(), z.number()]);

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace SearchRepoIntegrationsId$ {
  /** @deprecated use `SearchRepoIntegrationsId$inboundSchema` instead. */
  export const inboundSchema = SearchRepoIntegrationsId$inboundSchema;
  /** @deprecated use `SearchRepoIntegrationsId$outboundSchema` instead. */
  export const outboundSchema = SearchRepoIntegrationsId$outboundSchema;
  /** @deprecated use `SearchRepoIntegrationsId$Outbound` instead. */
  export type Outbound = SearchRepoIntegrationsId$Outbound;
}

/** @internal */
export const Owner$inboundSchema: z.ZodType<Owner, z.ZodTypeDef, unknown> = z
  .object({
    id: z.union([z.string(), z.number()]),
    name: z.string(),
  });

/** @internal */
export type Owner$Outbound = {
  id: string | number;
  name: string;
};

/** @internal */
export const Owner$outboundSchema: z.ZodType<
  Owner$Outbound,
  z.ZodTypeDef,
  Owner
> = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Owner$ {
  /** @deprecated use `Owner$inboundSchema` instead. */
  export const inboundSchema = Owner$inboundSchema;
  /** @deprecated use `Owner$outboundSchema` instead. */
  export const outboundSchema = Owner$outboundSchema;
  /** @deprecated use `Owner$Outbound` instead. */
  export type Outbound = Owner$Outbound;
}

/** @internal */
export const OwnerType$inboundSchema: z.ZodNativeEnum<typeof OwnerType> = z
  .nativeEnum(OwnerType);

/** @internal */
export const OwnerType$outboundSchema: z.ZodNativeEnum<typeof OwnerType> =
  OwnerType$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace OwnerType$ {
  /** @deprecated use `OwnerType$inboundSchema` instead. */
  export const inboundSchema = OwnerType$inboundSchema;
  /** @deprecated use `OwnerType$outboundSchema` instead. */
  export const outboundSchema = OwnerType$outboundSchema;
}

/** @internal */
export const Repos$inboundSchema: z.ZodType<Repos, z.ZodTypeDef, unknown> = z
  .object({
    id: z.union([z.string(), z.number()]),
    provider: SearchRepoIntegrationsProvider$inboundSchema,
    url: z.string(),
    name: z.string(),
    slug: z.string(),
    namespace: z.string(),
    owner: z.lazy(() => Owner$inboundSchema),
    ownerType: OwnerType$inboundSchema,
    private: z.boolean(),
    defaultBranch: z.string(),
    updatedAt: z.number(),
  });

/** @internal */
export type Repos$Outbound = {
  id: string | number;
  provider: string;
  url: string;
  name: string;
  slug: string;
  namespace: string;
  owner: Owner$Outbound;
  ownerType: string;
  private: boolean;
  defaultBranch: string;
  updatedAt: number;
};

/** @internal */
export const Repos$outboundSchema: z.ZodType<
  Repos$Outbound,
  z.ZodTypeDef,
  Repos
> = z.object({
  id: z.union([z.string(), z.number()]),
  provider: SearchRepoIntegrationsProvider$outboundSchema,
  url: z.string(),
  name: z.string(),
  slug: z.string(),
  namespace: z.string(),
  owner: z.lazy(() => Owner$outboundSchema),
  ownerType: OwnerType$outboundSchema,
  private: z.boolean(),
  defaultBranch: z.string(),
  updatedAt: z.number(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Repos$ {
  /** @deprecated use `Repos$inboundSchema` instead. */
  export const inboundSchema = Repos$inboundSchema;
  /** @deprecated use `Repos$outboundSchema` instead. */
  export const outboundSchema = Repos$outboundSchema;
  /** @deprecated use `Repos$Outbound` instead. */
  export type Outbound = Repos$Outbound;
}

/** @internal */
export const SearchRepoResponseBody$inboundSchema: z.ZodType<
  SearchRepoResponseBody,
  z.ZodTypeDef,
  unknown
> = z.object({
  gitAccount: z.lazy(() => GitAccount$inboundSchema),
  repos: z.array(z.lazy(() => Repos$inboundSchema)),
});

/** @internal */
export type SearchRepoResponseBody$Outbound = {
  gitAccount: GitAccount$Outbound;
  repos: Array<Repos$Outbound>;
};

/** @internal */
export const SearchRepoResponseBody$outboundSchema: z.ZodType<
  SearchRepoResponseBody$Outbound,
  z.ZodTypeDef,
  SearchRepoResponseBody
> = z.object({
  gitAccount: z.lazy(() => GitAccount$outboundSchema),
  repos: z.array(z.lazy(() => Repos$outboundSchema)),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace SearchRepoResponseBody$ {
  /** @deprecated use `SearchRepoResponseBody$inboundSchema` instead. */
  export const inboundSchema = SearchRepoResponseBody$inboundSchema;
  /** @deprecated use `SearchRepoResponseBody$outboundSchema` instead. */
  export const outboundSchema = SearchRepoResponseBody$outboundSchema;
  /** @deprecated use `SearchRepoResponseBody$Outbound` instead. */
  export type Outbound = SearchRepoResponseBody$Outbound;
}
