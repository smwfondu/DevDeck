#include <iostream>
#include <curl/curl.h>
#include <string>
#include <vector>

using namespace std;

// Function to handle cURL response
size_t WriteCallback(void* contents, size_t size, size_t nmemb, string* output) {
    size_t totalSize = size * nmemb;
    output->append((char*)contents, totalSize);
    return totalSize;
}

// Function to fetch raw JSON data from GitHub API
string fetchGitHubData(const string& username) {
    CURL* curl;
    CURLcode res;
    string readBuffer;

    curl = curl_easy_init();
    if (curl) {
        string url = "https://api.github.com/users/" + username + "/repos";
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &readBuffer);
        curl_easy_setopt(curl, CURLOPT_USERAGENT, "Mozilla/5.0"); // Required by GitHub API
        res = curl_easy_perform(curl);
        curl_easy_cleanup(curl);
    }
    return readBuffer;
}

// Helper function to extract a value from JSON text
string extractValue(const string& json, const string& key) {
    size_t keyPos = json.find("\"" + key + "\":");
    if (keyPos == string::npos) return "Not found";

    size_t start = json.find(":", keyPos) + 1;
    while (json[start] == ' ' || json[start] == '\"') start++; // Skip spaces and quotes

    size_t end = start;
    while (end < json.size() && json[end] != ',' && json[end] != '}' && json[end] != '\"') end++;

    return json.substr(start, end - start);
}

// Function to get repository names
vector<string> getRepoNames(const string& username) {
    string data = fetchGitHubData(username);
    vector<string> repoNames;
    size_t pos = 0;

    while ((pos = data.find("\"name\":", pos)) != string::npos) {
        repoNames.push_back(extractValue(data.substr(pos), "name"));
        pos++; // Move position forward
    }

    return repoNames;
}

// Function to get repository languages
vector<string> getRepoLanguages(const string& username) {
    string data = fetchGitHubData(username);
    vector<string> repoLanguages;
    size_t pos = 0;

    while ((pos = data.find("\"language\":", pos)) != string::npos) {
        string lang = extractValue(data.substr(pos), "language");
        repoLanguages.push_back(lang == "null" ? "Not specified" : lang);
        pos++;
    }

    return repoLanguages;
}

// Function to get repository descriptions
vector<string> getRepoDescriptions(const string& username) {
    string data = fetchGitHubData(username);
    vector<string> repoDescriptions;
    size_t pos = 0;

    while ((pos = data.find("\"description\":", pos)) != string::npos) {
        string desc = extractValue(data.substr(pos), "description");
        repoDescriptions.push_back(desc == "null" ? "No description" : desc);
        pos++;
    }

    return repoDescriptions;
}

// Function to get repository URLs
vector<string> getRepoURLs(const string& username) {
    string data = fetchGitHubData(username);
    vector<string> repoURLs;
    size_t pos = 0;

    while ((pos = data.find("\"html_url\":", pos)) != string::npos) {
        repoURLs.push_back(extractValue(data.substr(pos), "html_url"));
        pos++;
    }

    return repoURLs;
}
/*
// Main function for testing
int main() {
    string username;
    cout << "Enter GitHub username: ";
    cin >> username;

    vector<string> names = getRepoNames(username);
    vector<string> languages = getRepoLanguages(username);
    vector<string> descriptions = getRepoDescriptions(username);
    vector<string> urls = getRepoURLs(username);

    cout << "\nGitHub Repositories for: " << username << "\n";
    for (size_t i = 0; i < names.size(); i++) {
        cout << "----------------------\n";
        cout << "Repo Name: " << names[i] << "\n";
        cout << "Description: " << descriptions[i] << "\n";
        cout << "Language: " << languages[i] << "\n";
        cout << "URL: " << urls[i] << "\n";
    }

    return 0;
}
*/
