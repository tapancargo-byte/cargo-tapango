export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      app_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      bookings: {
        Row: {
          cargo_type: string | null
          contact_phone: string | null
          created_at: string | null
          delivery_address: string
          delivery_date: string | null
          dimensions: string | null
          estimated_cost: number | null
          id: string
          pickup_address: string
          pickup_date: string | null
          special_instructions: string | null
          status: string | null
          tracking_number: string
          urgency: string | null
          user_id: string | null
          weight: string | null
        }
        Insert: {
          cargo_type?: string | null
          contact_phone?: string | null
          created_at?: string | null
          delivery_address: string
          delivery_date?: string | null
          dimensions?: string | null
          estimated_cost?: number | null
          id?: string
          pickup_address: string
          pickup_date?: string | null
          special_instructions?: string | null
          status?: string | null
          tracking_number: string
          urgency?: string | null
          user_id?: string | null
          weight?: string | null
        }
        Update: {
          cargo_type?: string | null
          contact_phone?: string | null
          created_at?: string | null
          delivery_address?: string
          delivery_date?: string | null
          dimensions?: string | null
          estimated_cost?: number | null
          id?: string
          pickup_address?: string
          pickup_date?: string | null
          special_instructions?: string | null
          status?: string | null
          tracking_number?: string
          urgency?: string | null
          user_id?: string | null
          weight?: string | null
        }
        Relationships: []
      }
      driver_offers: {
        Row: {
          amount_inr: number
          created_at: string | null
          id: string
          note: string | null
          tracking_id: string
        }
        Insert: {
          amount_inr: number
          created_at?: string | null
          id?: string
          note?: string | null
          tracking_id: string
        }
        Update: {
          amount_inr?: number
          created_at?: string | null
          id?: string
          note?: string | null
          tracking_id?: string
        }
        Relationships: []
      }
      drivers: {
        Row: {
          bank_details: Json | null
          created_at: string | null
          documents: Json | null
          id: string
          is_online: boolean | null
          is_verified: boolean | null
          license_expiry: string | null
          license_number: string
          rating: number | null
          status: Database["public"]["Enums"]["driver_status"] | null
          total_ratings: number | null
          updated_at: string | null
          vehicle_info: Json
          verification_notes: string | null
        }
        Insert: {
          bank_details?: Json | null
          created_at?: string | null
          documents?: Json | null
          id: string
          is_online?: boolean | null
          is_verified?: boolean | null
          license_expiry?: string | null
          license_number: string
          rating?: number | null
          status?: Database["public"]["Enums"]["driver_status"] | null
          total_ratings?: number | null
          updated_at?: string | null
          vehicle_info: Json
          verification_notes?: string | null
        }
        Update: {
          bank_details?: Json | null
          created_at?: string | null
          documents?: Json | null
          id?: string
          is_online?: boolean | null
          is_verified?: boolean | null
          license_expiry?: string | null
          license_number?: string
          rating?: number | null
          status?: Database["public"]["Enums"]["driver_status"] | null
          total_ratings?: number | null
          updated_at?: string | null
          vehicle_info?: Json
          verification_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drivers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string | null
          created_by: string
          currency: string | null
          customer_id: string
          discount_total: number | null
          due_date: string | null
          id: string
          invoice_number: string
          issue_date: string | null
          line_items: Json
          notes: string | null
          order_id: string | null
          pdf_url: string | null
          status: Database["public"]["Enums"]["invoice_status"] | null
          subtotal: number
          tax_total: number | null
          terms: string | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          currency?: string | null
          customer_id: string
          discount_total?: number | null
          due_date?: string | null
          id?: string
          invoice_number: string
          issue_date?: string | null
          line_items: Json
          notes?: string | null
          order_id?: string | null
          pdf_url?: string | null
          status?: Database["public"]["Enums"]["invoice_status"] | null
          subtotal: number
          tax_total?: number | null
          terms?: string | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          customer_id?: string | null
          discount_total?: number | null
          due_date?: string | null
          id?: string | null
          invoice_number?: string | null
          issue_date?: string | null
          line_items?: Json | null
          notes?: string | null
          order_id?: string | null
          pdf_url?: string | null
          status?: Database["public"]["Enums"]["invoice_status"] | null
          subtotal?: number | null
          tax_total?: number | null
          terms?: string | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      kyc_reviews: {
        Row: {
          id: string
          path: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
        }
        Insert: {
          id?: string
          path: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Update: {
          id?: string
          path?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          payload: Json | null
          push_delivery_status: string | null
          push_sent: boolean | null
          push_sent_at: string | null
          read_at: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          payload?: Json | null
          push_delivery_status?: string | null
          push_sent?: boolean | null
          push_sent_at?: string | null
          read_at?: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          payload?: Json | null
          push_delivery_status?: string | null
          push_sent?: boolean | null
          push_sent_at?: string | null
          read_at?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          base_price: number
          created_at: string | null
          currency: string | null
          customer_id: string
          delivery_address: Json
          delivery_time: string | null
          discount_amount: number | null
          distance_price: number | null
          driver_id: string | null
          estimated_delivery: string | null
          feedback: string | null
          id: string
          notes: string | null
          package_details: Json
          pickup_address: Json
          pickup_time: string | null
          price: number | null
          rating: number | null
          route: string | null
          route_data: Json | null
          status: Database["public"]["Enums"]["order_status"] | null
          surge_multiplier: number | null
          tax_amount: number | null
          total_price: number
          tracking_code: string
          updated_at: string | null
          user_id: string | null
          weight_price: number | null
        }
        Insert: {
          base_price: number
          created_at?: string | null
          currency?: string | null
          customer_id: string
          delivery_address: Json
          delivery_time?: string | null
          discount_amount?: number | null
          distance_price?: number | null
          driver_id?: string | null
          estimated_delivery?: string | null
          feedback?: string | null
          id?: string
          notes?: string | null
          package_details: Json
          pickup_address: Json
          pickup_time?: string | null
          price?: number | null
          rating?: number | null
          route?: string | null
          route_data?: Json | null
          status?: Database["public"]["Enums"]["order_status"] | null
          surge_multiplier?: number | null
          tax_amount?: number | null
          total_price: number
          tracking_code: string
          updated_at?: string | null
          user_id?: string | null
          weight_price?: number | null
        }
        Update: {
          base_price?: number | null
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          delivery_address?: Json | null
          delivery_time?: string | null
          discount_amount?: number | null
          distance_price?: number | null
          driver_id?: string | null
          estimated_delivery?: string | null
          feedback?: string | null
          id?: string | null
          notes?: string | null
          package_details?: Json | null
          pickup_address?: Json | null
          pickup_time?: string | null
          price?: number | null
          rating?: number | null
          route?: string | null
          route_data?: Json | null
          status?: Database["public"]["Enums"]["order_status"] | null
          surge_multiplier?: number | null
          tax_amount?: number | null
          total_price?: number | null
          tracking_code?: string | null
          updated_at?: string | null
          user_id?: string | null
          weight_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: Json | null
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          phone: string | null
          preferences: Json | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          address?: Json | null
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          phone?: string | null
          preferences?: Json | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          address?: Json | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string | null
          is_active?: boolean | null
          metadata?: Json | null
          name?: string | null
          phone?: string | null
          preferences?: Json | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      push_tokens: {
        Row: {
          created_at: string | null
          device_info: Json | null
          id: string
          is_active: boolean | null
          last_used_at: string | null
          platform: string
          token: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_info?: Json | null
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          platform: string
          token: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_info?: Json | null
          id?: string | null
          is_active?: boolean | null
          last_used_at?: string | null
          platform?: string | null
          token?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "push_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_system_role: boolean | null
          name: string
          permissions: string[]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_system_role?: boolean | null
          name: string
          permissions: string[]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          is_system_role?: boolean | null
          name?: string | null
          permissions?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tracking_events: {
        Row: {
          created_at: string
          description: string | null
          id: string
          location: string | null
          status: string | null
          timestamp: string
          tracking_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string | null
          location?: string | null
          status?: string | null
          timestamp?: string | null
          tracking_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          location?: string | null
          status?: string | null
          timestamp?: string | null
          tracking_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role_id: string
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role_id: string
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string | null
          role_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_booking: {
        Args: {
          p_cargo_type: string
          p_contact_phone: string
          p_delivery_address: string
          p_delivery_date: string
          p_dimensions: string
          p_estimated_cost: number
          p_pickup_address: string
          p_pickup_date: string
          p_special_instructions: string
          p_tracking_number: string
          p_urgency: string
          p_user_id: string
          p_weight: string
        }
        Returns: {
          booking_id: string
        }[]
      }
      get_quote: {
        Args: {
          p_cargotype: string
          p_delivery: string
          p_dims: string
          p_pickup: string
          p_weightkg: number
        }
        Returns: Json
      }
      get_tracking_events_public: {
        Args: { p_tracking_id: string }
        Returns: {
          created_at: string
          description: string | null
          id: string
          location: string | null
          status: string | null
          timestamp: string
          tracking_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "tracking_events"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      is_admin: { Args: { uid: string }; Returns: boolean }
    }
    Enums: {
      driver_status: "offline" | "online" | "busy" | "break"
      invoice_status: "draft" | "issued" | "paid" | "overdue" | "void"
      notification_type:
        | "order_update"
        | "driver_assigned"
        | "payment"
        | "invoice"
        | "system"
        | "marketing"
      order_status:
        | "pending"
        | "confirmed"
        | "driver_assigned"
        | "picked_up"
        | "in_transit"
        | "delivered"
        | "cancelled"
      payment_status:
        | "pending"
        | "processing"
        | "completed"
        | "failed"
        | "refunded"
      user_role: "customer" | "driver" | "admin" | "super_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"]) 
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      driver_status: ["offline", "online", "busy", "break"],
      invoice_status: ["draft", "issued", "paid", "overdue", "void"],
      notification_type: [
        "order_update",
        "driver_assigned",
        "payment",
        "invoice",
        "system",
        "marketing",
      ],
      order_status: [
        "pending",
        "confirmed",
        "driver_assigned",
        "picked_up",
        "in_transit",
        "delivered",
        "cancelled",
      ],
      payment_status: [
        "pending",
        "processing",
        "completed",
        "failed",
        "refunded",
      ],
      user_role: ["customer", "driver", "admin", "super_admin"],
    },
  },
} as const
