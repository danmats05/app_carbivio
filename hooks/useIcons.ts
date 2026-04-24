"use client";

import {
  // Navigation & Layout
  ChartLine,
  Truck,
  Users,
  MapPin,
  Package,
  ChartBar,
  Gear,
  CaretLeft,
  CaretRight,
  CaretDown,
  CaretUp,

  // Actions & Interactions
  MagnifyingGlass,
  Bell,
  Eye,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Plus,
  Minus,
  X,
  Check,
  PencilSimple,
  Trash,
  Download,
  Upload,
  DotsThree,
  DotsSix,

  // Status & Indicators
  TrendUp,
  TrendDown,
  Circle,
  Square,
  Triangle,
  Star,
  Heart,
  Warning,
  Info,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,

  // Energy & Resources
  GasPump,
  Lightning,
  Drop,
  BatteryCharging,
  BatteryFull,
  BatteryEmpty,
  Flame,
  Sun,
  Moon,

  // Business & Finance
  CurrencyDollar,
  CurrencyEur,
  CurrencyBtc,
  CreditCard,
  Wallet,
  PiggyBank,
  ChartPie,
  ChartLineUp,
  ChartLineDown,

  // Communication
  Phone,
  Envelope,
  ChatCircle,
  ChatDots,
  SpeakerHigh,
  SpeakerSlash,
  Microphone,
  MicrophoneSlash,

  // Media & Files
  Image,
  File,
  Folder,
  FolderOpen,
  FileText,
  FilePdf,
  FileZip,
  Play,
  Pause,
  Stop,

  // System
  GearSix,
  Power,
  Lock,
  Key,
  Shield,
  Flag,
  Bookmark,
  ShareNetwork,

  // Social
  User,
  UsersThree,
  UserCircle,
  UserPlus,
  UserMinus,
  HandWaving,
  ThumbsUp,
  ThumbsDown,

  // Transportation
  Car,
  Airplane,
  Train,
  Bicycle,
  Motorcycle,

  // Shopping & Commerce
  ShoppingCart,
  Storefront,
  Tag,
  Barcode,
  Receipt,

  // Maps & Location
  MapTrifold,
  Compass,
  NavigationArrow,
  Signpost,

  // Time & Calendar
  ClockClockwise,
  ClockCounterClockwise,
  CalendarBlank,
  CalendarCheck,

  // Weather & Nature
  Cloud,
  CloudRain,
  CloudSun,
  Snowflake,
  Tree,
  Leaf,

  // Miscellaneous
  Hash,
  At,
  Link,
  LinkBreak,
  Copy,
  Scissors,
  Eraser,
} from "@phosphor-icons/react";

/**
 * Hook centralisé pour les icônes Phosphor
 * Règle : TOUJOURS utiliser les icônes Phosphor dans tout le projet Carbivio
 *
 * @example
 * ```tsx
 * import { useIcons } from "@/hooks/useIcons";
 *
 * function MyComponent() {
 *   const { icons } = useIcons();
 *
 *   return (
 *     <div>
 *       <icons.Truck className="w-5 h-5" />
 *       <icons.TrendUp className="w-4 h-4 text-green-500" />
 *     </div>
 *   );
 * }
 * ```
 */

export function useIcons() {
  return {
    // Navigation & Layout
    navigation: {
      dashboard: ChartLine,
      fleet: Truck,
      users: Users,
      locations: MapPin,
      orders: Package,
      analytics: ChartBar,
      settings: Gear,
      home: Drop,
    },

    // Actions
    actions: {
      search: MagnifyingGlass,
      notifications: Bell,
      view: Eye,
      add: Plus,
      remove: Minus,
      edit: PencilSimple,
      delete: Trash,
      download: Download,
      upload: Upload,
      more: DotsThree,
      close: X,
      check: Check,
      back: CaretLeft,
      forward: CaretRight,
    },

    // Status & Indicators
    status: {
      success: CheckCircle,
      error: XCircle,
      warning: Warning,
      info: Info,
      loading: Clock,
      pending: Clock,
      completed: CheckCircle,
      cancelled: XCircle,
    },

    // Trends
    trends: {
      up: TrendUp,
      down: TrendDown,
      neutral: Minus,
    },

    // Energy & Resources (Carbivio specific)
    energy: {
      fuel: GasPump,
      battery: Lightning,
      oil: Drop,
      charging: BatteryCharging,
      full: BatteryFull,
      empty: BatteryEmpty,
    },

    // Business & Finance
    business: {
      revenue: CurrencyDollar,
      profit: TrendUp,
      loss: TrendDown,
      sales: ChartBar,
      customers: Users,
    },

    // Communication
    communication: {
      phone: Phone,
      email: Envelope,
      chat: ChatDots,
      notify: Bell,
    },

    // Files & Media
    media: {
      image: Image,
      document: FileText,
      folder: Folder,
      folderOpen: FolderOpen,
      play: Play,
      pause: Pause,
    },

    // User & Authentication
    user: {
      profile: User,
      group: UsersThree,
      login: UserCircle,
      logout: X,
      register: UserPlus,
    },

    // Transportation
    transport: {
      car: Car,
      truck: Truck,
      airplane: Airplane,
      train: Train,
    },

    // Shopping & Commerce
    commerce: {
      cart: ShoppingCart,
      store: Storefront,
      package: Package,
      product: Tag,
      receipt: Receipt,
    },

    // Time & Calendar
    time: {
      clock: Clock,
      calendar: Calendar,
      today: CalendarCheck,
      date: CalendarBlank,
    },

    // System
    system: {
      settings: Gear,
      power: Power,
      lock: Lock,
      security: Shield,
      admin: GearSix,
    },

    // Export all icons for direct access
    ChartLine,
    Truck,
    Users,
    MapPin,
    Package,
    ChartBar,
    Gear,
    CaretLeft,
    CaretRight,
    CaretDown,
    CaretUp,
    Drop,
    MagnifyingGlass,
    Bell,
    Eye,
    ArrowRight,
    ArrowLeft,
    ArrowUp,
    ArrowDown,
    Plus,
    Minus,
    X,
    Check,
    PencilSimple,
    Trash,
    Download,
    Upload,
    DotsThree,
    DotsSix,
    TrendUp,
    TrendDown,
    Circle,
    Square,
    Triangle,
    Star,
    Heart,
    Warning,
    Info,
    CheckCircle,
    XCircle,
    Clock,
    Calendar,
    GasPump,
    Lightning,
    BatteryCharging,
    BatteryFull,
    BatteryEmpty,
    Flame,
    Sun,
    Moon,
    CurrencyDollar,
    CurrencyEur,
    CurrencyBtc,
    CreditCard,
    Wallet,
    PiggyBank,
    ChartPie,
    ChartLineUp,
    ChartLineDown,
    Phone,
    Envelope,
    ChatCircle,
    ChatDots,
    SpeakerHigh,
    SpeakerSlash,
    Microphone,
    MicrophoneSlash,
    Image,
    File,
    Folder,
    FolderOpen,
    FileText,
    FilePdf,
    FileZip,
    Play,
    Pause,
    Stop,
    GearSix,
    Power,
    Lock,
    Key,
    Shield,
    Flag,
    Bookmark,
    ShareNetwork,
    User,
    UsersThree,
    UserCircle,
    UserPlus,
    UserMinus,
    HandWaving,
    ThumbsUp,
    ThumbsDown,
    Car,
    Airplane,
    Train,
    Bicycle,
    Motorcycle,
    ShoppingCart,
    Storefront,
    Tag,
    Barcode,
    Receipt,
    MapTrifold,
    Compass,
    NavigationArrow,
    Signpost,
    ClockClockwise,
    ClockCounterClockwise,
    CalendarBlank,
    CalendarCheck,
    Cloud,
    CloudRain,
    CloudSun,
    Snowflake,
    Tree,
    Leaf,
    Hash,
    At,
    Link,
    LinkBreak,
    Copy,
    Scissors,
    Eraser,
  };
}

/**
 * Export des icônes les plus courantes pour un accès rapide
 */
export const icons = {
  // Navigation
  Home: Drop,
  Dashboard: ChartLine,
  Settings: Gear,
  Users: Users,
  Truck: Truck,
  Package: Package,

  // Actions
  Search: MagnifyingGlass,
  Bell: Bell,
  Eye: Eye,
  Plus: Plus,
  Edit: PencilSimple,
  Trash: Trash,
  More: DotsThree,

  // Status
  Check: Check,
  X: X,
  Warning: Warning,
  Info: Info,

  // Trends
  TrendUp: TrendUp,
  TrendDown: TrendDown,

  // Carbivio specific
  Fuel: GasPump,
  Battery: Lightning,
  Oil: Drop,
  Money: CurrencyDollar,
};

/**
 * Règle d'or pour les icônes dans le projet Carbivio :
 *
 * TOUJOURS utiliser les icônes Phosphor (@phosphor-icons/react)
 * JAMAIS utiliser les icônes Lucide (lucide-react)
 *
 * Pour vérifier si une icône existe : https://phosphoricons.com/
 *
 * @example
 * // CORRECT - Utiliser Phosphor Icons
 * import { Truck } from "@phosphor-icons/react";
 *
 * // INCORRECT - Ne pas utiliser Lucide Icons
 * import { Truck } from "lucide-react";
 */
export const ICON_RULE = {
  library: "@phosphor-icons/react",
  forbidden: "lucide-react",
  rule: "TOUJOURS utiliser les icônes Phosphor dans tout le projet Carbivio",
  checkUrl: "https://phosphoricons.com/",
};
