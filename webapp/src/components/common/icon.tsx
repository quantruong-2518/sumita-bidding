import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Briefcase,
  Building2,
  Bus,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  CloudRain,
  Download,
  ExternalLink,
  FileText,
  Flame,
  Globe,
  HardHat,
  ImageOff,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Play,
  Quote,
  Recycle,
  Scale,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Square,
  TrafficCone,
  Trees,
  UtensilsCrossed,
  Users,
  Wifi,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

/* Fixtures lưu icon dạng string → map sang component. Thiếu → Square.
   Lưu ý: lucide-react (bản này) đã bỏ brand icons (Facebook/Linkedin) → dùng icon thay thế. */
const REGISTRY: Record<string, LucideIcon> = {
  ArrowLeft, ArrowRight, Banknote, Briefcase, Building2, Bus, Calendar, Check,
  ChevronDown, ChevronLeft, ChevronRight, Clock, CloudRain, Download, ExternalLink,
  FileText, Flame, Globe, HardHat, ImageOff, Loader2, Mail, MapPin, Menu,
  MessageCircle, Phone, Play, Quote, Recycle, Scale, Search, Settings, Share2,
  ShieldCheck, ShoppingCart, Square, TrafficCone, Trees, UtensilsCrossed, Users, Wifi, X, Zap,
  // alias social (brand icons không còn trong lucide-react)
  Facebook: Share2,
  Linkedin: Briefcase,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = REGISTRY[name] ?? Square;
  return <Cmp className={className} aria-hidden />;
}
