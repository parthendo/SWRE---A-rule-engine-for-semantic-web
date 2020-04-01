import org.apache.jena.query.ResultSet;

import Ontology2SDB2MySQL.*;

public class Test {
	public static void main(String args[]) throws Exception {
		String filename = "/home/mohit/git/SWRE---A-rule-engine-for-semantic-web/University.owl";
		String namespace = "SWRE";
		String prefix = "http://www.iiitb.org/university#";

		SDBUtilities.JDBCinit();
		//SDBUtilities.ont2SDB2SQL(filename, namespace, prefix);
		String query =  "PREFIX foo:<http://www.iiitb.org/university#>" +"SELECT *  {?s foo:studies foo:PS202}";
		ResultSet rs = SDBUtilities.SDBQuery(query);
		System.out.print(rs);
		System.out.println("Done");
	}
}
