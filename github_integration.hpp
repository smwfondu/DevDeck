#ifndef GITHUB_API_HPP
#define GITHUB_API_HPP

#include <iostream>
#include <curl/curl.h>
#include <string>
#include <vector>
#include <fstream>

using namespace std;

size_t WriteCallback(void* contents, size_t size, size_t nmemb, string* output);
string fetchGitHubData(const string& username);
string extractValue(const string& json, const string& key);
vector<string> getRepoNames(const string& username);
vector<string> getRepoLanguages(const string& username);
vector<string> getRepoDescriptions(const string& username);
vector<string> getRepoURLs(const string& username, const vector<string>& repoNames); // Updated function signature
void writeJSONData(const string& username);

#endif // GITHUB_API_HPP

