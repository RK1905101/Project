package com.highradius.servelet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Servlet implementation class fetchservlet
 */
@WebServlet("/fetchservlet")
public class fetchservlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public fetchservlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try
		{
			Connection conn = jdbc.connectToDB();
			Statement st = conn.createStatement();
			String query = "select * from winter_internship;"; 
			ResultSet rs = st.executeQuery(query);
			List<pojo> get_data = new ArrayList<>();
			PrintWriter out = response.getWriter();
			while(rs.next())
			{
				pojo obj1 = new pojo();
				obj1.setSl_no(rs.getInt("sl_no"));
				obj1.setBusiness_code(rs.getString("business_code"));
				obj1.setCust_number(rs.getInt("cust_number"));
				obj1.setClear_date(rs.getString("clear_date"));
				obj1.setBuisness_year(rs.getString("buisness_year"));
				obj1.setDoc_id(rs.getLong("doc_id"));
				obj1.setPosting_date(rs.getString("posting_date"));
				obj1.setDocument_create_date(rs.getString("document_create_date"));
				obj1.setDocument_create_date1(rs.getString("document_create_date1"));
				obj1.setDue_in_date(rs.getString("due_in_date"));
				obj1.setInvoice_currency(rs.getString("invoice_currency"));
				obj1.setDocument_type(rs.getString("document_type"));
				obj1.setPosting_id(rs.getInt("posting_id"));
				obj1.setArea_business(rs.getString("area_business"));
				obj1.setBaseline_create_date(rs.getString("baseline_create_date"));
				obj1.setCust_payment_terms(rs.getString("cust_payment_terms"));
				obj1.setInvoice_id(rs.getInt("invoice_id"));
				obj1.setTotal_open_amount(rs.getDouble("total_open_amount"));
				obj1.setIsOpen(rs.getInt("isOpen"));
				obj1.setAging_bucket(rs.getInt("aging_bucket"));
				obj1.setIs_deleted(rs.getInt("is_deleted"));
				
				get_data.add(obj1);
				//out.println(get_data);
			}
			
			//String json = new Gson().toJson(get_data);
			response.setHeader("Access-Control-Allow-Origin", "*");
			//response.getWriter().append(json);
			Gson gson = new GsonBuilder().serializeNulls().create();
			String invoices = gson.toJson(get_data);
			out.print(invoices);
			response.setStatus(200);
			st.close();
			conn.close();
			
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
}
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	
