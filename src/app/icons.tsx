// Small inline icons from Lucide. GitHub and LinkedIn use generic glyphs, with the name written beside them.
import { CodeXml, ExternalLink as Ext, FileText as File, Mail as M, MapPin as Pin, UserRound } from "lucide-react";

const p = { className: "i", "aria-hidden": true } as const;
export const Mail = () => <M {...p} />;
export const Github = () => <CodeXml {...p} />;
export const Linkedin = () => <UserRound {...p} />;
export const FileText = () => <File {...p} />;
export const MapPin = () => <Pin {...p} />;
export const ExternalLink = () => <Ext {...p} />;
