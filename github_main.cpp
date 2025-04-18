#include "github_integration.hpp"

int main() {
  string username;
  cout << "Enter GitHub username: ";
  cin >> username;
  /*
  vector<string> names = getRepoNames(username);
  vector<string> languages = getRepoLanguages(username);
  vector<string> descriptions = getRepoDescriptions(username);
  vector<string> urls =
      getRepoURLs(username, names);  // Use manually constructed URLs

  cout << "\nGitHub Repositories for: " << username << "\n";
  for (size_t i = 0; i < names.size(); i++) {
    cout << "----------------------\n";
    cout << "Repo Name: " << names[i] << "\n";
    cout << "Description: " << descriptions[i] << "\n";
    cout << "Language: "
         << (languages[i] == "null" ? "Not specified" : languages[i]) << "\n";
    cout << "URL: " << urls[i] << "\n";
  }*/

  //auto window = browser->mainFrame()->executeJavaScript("window").asJsObject();
  //window->putProperty("writeJSONData", &writeJSONData);

  return 0;
}
