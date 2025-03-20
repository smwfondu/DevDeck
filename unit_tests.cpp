#define BOOST_TEST_MODULE MyTestModule
#include <boost/test/included/unit_test.hpp>
#include <sstream>
#include "github_integration.cpp"

//test case 1
BOOST_AUTO_TEST_CASE(testFetchGitHubDataStringLength) {
    string result;

    result = fetchGitHubData("smwfondu");
    BOOST_REQUIRE_GT(result.length(), 0);
}

//test case 2
BOOST_AUTO_TEST_CASE(testGetRepoNamesStringLength) {
    vector<string> result;

    result = getRepoNames("smwfondu");
    BOOST_REQUIRE_EQUAL(result.empty(), false);
}

//test case 3
BOOST_AUTO_TEST_CASE(testGetRepoLanguagesStringLength) {
    vector<string> result;

    result = getRepoLanguages("smwfondu");
    BOOST_REQUIRE_EQUAL(result.empty(), false);
}

//test case 4
BOOST_AUTO_TEST_CASE(testGetRepoDescriptionsStringLength) {
    vector<string> result;

    result = getRepoDescriptions("smwfondu");
    BOOST_REQUIRE_EQUAL(result.empty(), false);
}

//test case 5
BOOST_AUTO_TEST_CASE(testGetRepoURLsStringLength) {
    vector<string> result;

    result = getRepoURLs("smwfondu");
    BOOST_REQUIRE_EQUAL(result.empty(), false);
}