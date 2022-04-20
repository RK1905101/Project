import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class jdbc {
	public static void main(String args[]) {
		try {
			final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
			final String URL = "jdbc:mysql://localhost:3306/sakila";
			final String USER = "root";
			final String PASS = "system";
			
			Class.forName(JDBC_DRIVER);
			Connection con = DriverManager.getConnection(URL,USER,PASS);
			Statement stm = con.createStatement();
			String query = "SELECT * FROM film";
			ResultSet rst = stm.executeQuery(query);
			
			while(rst.next()) {
				String title = rst.getString("title");
				String release_year = rst.getString("release_year");
				System.out.println(title+" "+release_year);
			}
			
			stm.close();
			con.close();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
