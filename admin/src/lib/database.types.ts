export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      drivers: {
        Row: {
          bank_details: Json | null
          created_at: string | null
          documents: Json | null
          id: string
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
      orders: {
        Row: {
          base_price: number
          cancellation_reason: string | null
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
          rating: number | null
          route_data: Json | null
          status: Database["public"]["Enums"]["order_status"] | null
          surge_multiplier: number | null
          tax_amount: number | null
          total_price: number
          tracking_code: string
          updated_at: string | null
          weight_price: number | null
        }
        Insert: {
          base_price: number
          cancellation_reason?: string | null
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
          rating?: number | null
          route_data?: Json | null
          status?: Database["public"]["Enums"]["order_status"] | null
          surge_multiplier?: number | null
          tax_amount?: number | null
          total_price: number
          tracking_code: string
          updated_at?: string | null
          weight_price?: number | null
        }
        Update: {
          base_price?: number
          cancellation_reason?: string | null
          created_at?: string | null
          currency?: string | null
          customer_id?: string
          delivery_address?: Json
          delivery_time?: string | null
          discount_amount?: number | null
          distance_price?: number | null
          driver_id?: string | null
          estimated_delivery?: string | null
          feedback?: string | null
          id?: string
          notes?: string | null
          package_details?: Json
          pickup_address?: Json
          pickup_time?: string | null
          rating?: number | null
          route_data?: Json | null
          status?: Database["public"]["Enums"]["order_status"] | null
          surge_multiplier?: number | null
          tax_amount?: number | null
          total_price?: number
          tracking_code?: string
          updated_at?: string | null
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
        ]
      }
      profiles: {
        Row: {
          address: Json | null
          avatar_url: string | null
          created_at: string | null
          email: string
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
          id: string
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
          email?: string
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          phone?: string | null
          preferences?: Json | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
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
          created_by?: string
          currency?: string | null
          customer_id?: string
          discount_total?: number | null
          due_date?: string | null
          id?: string
          invoice_number?: string
          issue_date?: string | null
          line_items?: Json
          notes?: string | null
          order_id?: string | null
          pdf_url?: string | null
          status?: Database["public"]["Enums"]["invoice_status"] | null
          subtotal?: number
          tax_total?: number | null
          terms?: string | null
          total_amount?: number
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
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          platform?: string
          token?: string
          user_id?: string
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
      app_settings: {
        Row: {
          id: string
          key: string
          value: Json
          description: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          description?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          description?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          id: string
          name: string
          description: string | null
          permissions: string[]
          is_system_role: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          permissions: string[]
          is_system_role?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          permissions?: string[]
          is_system_role?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role_id: string
          assigned_by: string | null
          assigned_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          role_id: string
          assigned_by?: string | null
          assigned_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          role_id?: string
          assigned_by?: string | null
          assigned_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
