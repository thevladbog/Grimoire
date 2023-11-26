import { ClassNameInitilizer, withNaming } from "@bem-react/classname";

export type CnMods = Record<string, string | boolean | undefined>;

export const NAMESPACE: string = "gn-";

export const cn: ClassNameInitilizer = withNaming({ e: "__", m: "_" });
export const block: ClassNameInitilizer = withNaming({ n: NAMESPACE, e: "__", m: "_" });

export type CnBlock = ReturnType<typeof cn>;
