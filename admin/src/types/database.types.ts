export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      audit_logs: {
        Row: {
          id: string
          table_name: string
          record_id: string
          action: string
          old_data: Json | null
          new_data: Json | null
          user_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          table_name: string
          record_id: string
          action: string
          old_data?: Json | null
          new_data?: Json | null
          user_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          table_name?: string
          record_id?: string
          action?: string
          old_data?: Json | null
          new_data?: Json | null
          user_id?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      drivers: {
        Row: {
          id: string
          user_id: string
          license_number: string
          vehicle_type: string
          vehicle_model: string | null
          vehicle_plate: string | null
          status: "pending" | "approved" | "suspended" | "rejected"
          is_online: boolean
          current_location: Json | null
          rating: number
          total_trips: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          license_number: string
          vehicle_type: string
          vehicle_model?: string | null
          vehicle_plate?: string | null
          status?: "pending" | "approved" | "suspended" | "rejected"
          is_online?: boolean
          current_location?: Json | null
          rating?: number
          total_trips?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          license_number?: string
          vehicle_type?: string
          vehicle_model?: string | null
          vehicle_plate?: string | null
          status?: "pending" | "approved" | "suspended" | "rejected"
          is_online?: boolean
          current_location?: Json | null
          rating?: number
          total_trips?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "drivers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      invoices: {
        Row: {
          id: string
          order_id: string
          customer_id: string
          invoice_number: string
          amount: number
          tax_amount: number
          total_amount: number
          status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
          due_date: string
          paid_at: string | null
          pdf_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          customer_id: string
          invoice_number: string
          amount: number
          tax_amount: number
          total_amount: number
          status?: "draft" | "sent" | "paid" | "overdue" | "cancelled"
          due_date: string
          paid_at?: string | null
          pdf_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          customer_id?: string
          invoice_number?: string
          amount?: number
          tax_amount?: number
          total_amount?: number
          status?: "draft" | "sent" | "paid" | "overdue" | "cancelled"
          due_date?: string
          paid_at?: string | null
          pdf_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
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
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: "info" | "success" | "warning" | "error"
          is_read: boolean
          data: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: "info" | "success" | "warning" | "error"
          is_read?: boolean
          data?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: "info" | "success" | "warning" | "error"
          is_read?: boolean
          data?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          id: string
          customer_id: string
          driver_id: string | null
          pickup_address: string
          pickup_location: Json
          delivery_address: string
          delivery_location: Json
          package_details: Json
          price: number
          status: "pending" | "assigned" | "picked_up" | "in_transit" | "delivered" | "cancelled"
          estimated_delivery: string | null
          actual_delivery: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          driver_id?: string | null
          pickup_address: string
          pickup_location: Json
          delivery_address: string
          delivery_location: Json
          package_details: Json
          price: number
          status?: "pending" | "assigned" | "picked_up" | "in_transit" | "delivered" | "cancelled"
          estimated_delivery?: string | null
          actual_delivery?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          driver_id?: string | null
          pickup_address?: string
          pickup_location?: Json
          delivery_address?: string
          delivery_location?: Json
          package_details?: Json
          price?: number
          status?: "pending" | "assigned" | "picked_up" | "in_transit" | "delivered" | "cancelled"
          estimated_delivery?: string | null
          actual_delivery?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
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
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          role: "customer" | "driver" | "admin" | "super_admin"
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          phone?: string | null
          role?: "customer" | "driver" | "admin" | "super_admin"
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          role?: "customer" | "driver" | "admin" | "super_admin"
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      push_tokens: {
        Row: {
          id: string
          user_id: string
          token: string
          platform: "ios" | "android" | "web"
          device_id: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          token: string
          platform: "ios" | "android" | "web"
          device_id?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          token?: string
          platform?: "ios" | "android" | "web"
          device_id?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "push_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      payments: {
        Row: {
          id: string
          invoice_id: string
          amount: number
          method: "cash" | "card" | "digital_wallet" | "bank_transfer"
          status: "pending" | "completed" | "failed" | "refunded"
          transaction_id: string | null
          gateway_response: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          invoice_id: string
          amount: number
          method: "cash" | "card" | "digital_wallet" | "bank_transfer"
          status?: "pending" | "completed" | "failed" | "refunded"
          transaction_id?: string | null
          gateway_response?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          invoice_id?: string
          amount?: number
          method?: "cash" | "card" | "digital_wallet" | "bank_transfer"
          status?: "pending" | "completed" | "failed" | "refunded"
          transaction_id?: string | null
          gateway_response?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          }
        ]
      }
      app_settings: {
        Row: {
          id: string
          key: string
          value: Json
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          description?: string | null
          created_at?: string
          updated_at?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
