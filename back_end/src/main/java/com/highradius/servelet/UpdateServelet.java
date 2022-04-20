package com.highradius.servelet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class UpdateServelet
 */
@WebServlet("/UpdateServelet")
public class UpdateServelet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateServelet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
		//jdbc
		try {
			final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
			final String URL = "jdbc:mysql://localhost:3306/grey_goose";
			final String USER = "root";
			final String PASS = "sonu1999";
			
			Class.forName(JDBC_DRIVER);
			Connection con = DriverManager.getConnection(URL,USER,PASS);
			Statement stm= con.createStatement();
			String query = "select sl_no from winter_internship;"; 
			ResultSet rs= stm.executeQuery(query);
			PrintWriter out = response.getWriter();
			while (rs.next()) {
				int id=rs.getInt("sl_no");
				out.println(id);
			}
			
			stm.close();
			con.close();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
