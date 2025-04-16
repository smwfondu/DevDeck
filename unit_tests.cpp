#define BOOST_TEST_MODULE MyTestModule
#include <boost/test/included/unit_test.hpp>
#include <sstream>
#include "github_integration.hpp"

//test case 1
BOOST_AUTO_TEST_CASE(testFetchGitHubDataStringLength) {
    string result;

    BOOST_REQUIRE_NO_THROW(result = fetchGitHubData("smwfondu"));
    BOOST_REQUIRE_GT(result.length(), 0);
}

//test case 2
BOOST_AUTO_TEST_CASE(testGetRepoNamesStringLength) {
    vector<string> result;

    BOOST_REQUIRE_NO_THROW(result = getRepoNames("smwfondu"));
    BOOST_REQUIRE_EQUAL(result.empty(), false);
}

//test case 3
BOOST_AUTO_TEST_CASE(testGetRepoLanguagesStringLength) {
    vector<string> result;

    BOOST_REQUIRE_NO_THROW(result = getRepoLanguages("smwfondu"));
    BOOST_REQUIRE_EQUAL(result.empty(), false);
}

//test case 4
BOOST_AUTO_TEST_CASE(testGetRepoDescriptionsStringLength) {
    vector<string> result;

    BOOST_REQUIRE_NO_THROW(result = getRepoDescriptions("smwfondu"));
    BOOST_REQUIRE_EQUAL(result.empty(), false);
}

//test case 5
BOOST_AUTO_TEST_CASE(testGetRepoURLsStringLength) {
    vector<string> result;
    vector<string> names = getRepoNames("smwfondu");

    BOOST_REQUIRE_NO_THROW(result = getRepoURLs("smwfondu", names));
    BOOST_REQUIRE_EQUAL(result.empty(), false);
}

//test case 6
BOOST_AUTO_TEST_CASE(testGetRepoNamesOnEmpty) {
    vector<string> result;

    BOOST_REQUIRE_NO_THROW(result = getRepoNames("ryanc3258"));
    BOOST_REQUIRE_EQUAL(result.empty(), true);
}

//test case 7
BOOST_AUTO_TEST_CASE(testGetReopLanguagesOnEmpty) {
    vector<string> result;

    BOOST_REQUIRE_NO_THROW(result = getRepoLanguages("ryanc3258"));
    BOOST_REQUIRE_EQUAL(result.empty(), true);
}

//test case 8
BOOST_AUTO_TEST_CASE(testGetRepoDescriptionsOnEmpty) {
    vector<string> result;

    BOOST_REQUIRE_NO_THROW(result = getRepoDescriptions("ryanc3258"));
    BOOST_REQUIRE_EQUAL(result.empty(), true);
}

//test case 9
BOOST_AUTO_TEST_CASE(testGetRepoURLsOnEmpty) {
    vector<string> result;
    vector<string> names = getRepoNames("ryanc3258");

    BOOST_REQUIRE_NO_THROW(result = getRepoURLs("ryanc3258", names));
    BOOST_REQUIRE_EQUAL(result.empty(), true);
}

//test case 10
BOOST_AUTO_TEST_CASE(testGetRepoNamesSpecific) {
    vector<string> result;

    BOOST_REQUIRE_NO_THROW(result = getRepoNames("smwfondu"));
    BOOST_REQUIRE_EQUAL(result.size(), 5);
    BOOST_REQUIRE_EQUAL(result[0], "AbstractSpace");
    BOOST_REQUIRE_EQUAL(result[1], "DevDeck");
    BOOST_REQUIRE_EQUAL(result[2], "PirateHorrorGame");
    BOOST_REQUIRE_EQUAL(result[3], "TargetShooter");
    BOOST_REQUIRE_EQUAL(result[4], "testpart2");
}

//test case 11
BOOST_AUTO_TEST_CASE(testGetRepoLanguagesSpecific) {
    vector<string> result;

    BOOST_REQUIRE_NO_THROW(result = getRepoLanguages("smwfondu"));
    BOOST_REQUIRE_EQUAL(result.size(), 5);
    BOOST_REQUIRE_EQUAL(result[0], "C#");
    BOOST_REQUIRE_EQUAL(result[1], "C++");
    BOOST_REQUIRE_EQUAL(result[2], "C#");
    BOOST_REQUIRE_EQUAL(result[3], "C#");
    BOOST_REQUIRE_EQUAL(result[4], "Not specified");
}

//test case 12
BOOST_AUTO_TEST_CASE(testGetRepoDescriptionsSpecific) {
    vector<string> result;

    BOOST_REQUIRE_NO_THROW(result = getRepoDescriptions("smwfondu"));
    BOOST_REQUIRE_EQUAL(result.size(), 5);
    BOOST_REQUIRE_EQUAL(result[0], "No description");
    BOOST_REQUIRE_EQUAL(result[1], "No description");
    BOOST_REQUIRE_EQUAL(result[2], "The Death of a Pirate");
    BOOST_REQUIRE_EQUAL(result[3], "COMP 4110 Software Engineering I: Design 1 Project");
    BOOST_REQUIRE_EQUAL(result[4], "test for our game");
}

//test case 13
BOOST_AUTO_TEST_CASE(testGetRepoURLsSpecific) { //URLs are not correct
    vector<string> result;
    vector<string> names = getRepoNames("smwfondu");

    BOOST_REQUIRE_NO_THROW(result = getRepoURLs("smwfondu", names));
    //BOOST_REQUIRE_EQUAL(result.size(), 5);
    BOOST_REQUIRE_EQUAL(result[0], "https://github.com/smwfondu/AbstractSpace");
    BOOST_REQUIRE_EQUAL(result[1], "https://github.com/smwfondu/DevDeck");
    BOOST_REQUIRE_EQUAL(result[2], "https://github.com/smwfondu/PirateHorrorGame");
    BOOST_REQUIRE_EQUAL(result[3], "https://github.com/smwfondu/TargetShooter");
    BOOST_REQUIRE_EQUAL(result[4], "https://github.com/smwfondu/testpart2");
}

//test case 14
BOOST_AUTO_TEST_CASE(testExtractValueRepoNames) {
    string rawData;
    string result;
    size_t pos = 0;
    size_t cnt = 0;
    string names[] = {"AbstractSpace", "DevDeck", "PirateHorrorGame", "TargetShooter", "testpart2"};

    BOOST_REQUIRE_NO_THROW(rawData = fetchGitHubData("smwfondu"));

    while ((pos = rawData.find("\"name\":", pos)) != string::npos) {
        BOOST_REQUIRE_NO_THROW(result = (extractValue(rawData.substr(pos), "name")));
        BOOST_REQUIRE_EQUAL(result, names[cnt]);
        pos++;
        cnt++;
    }

    BOOST_REQUIRE_EQUAL(cnt, 5);
}

//test case 15
BOOST_AUTO_TEST_CASE(testExtractValueRepoLanguages) {
    string rawData;
    string result;
    size_t pos = 0;
    size_t cnt = 0;
    string languages[] = {"C#", "C++", "C#", "C#", "null"};

    BOOST_REQUIRE_NO_THROW(rawData = fetchGitHubData("smwfondu"));

    while ((pos = rawData.find("\"language\":", pos)) != string::npos) {
        BOOST_REQUIRE_NO_THROW(result = (extractValue(rawData.substr(pos), "language")));
        BOOST_REQUIRE_EQUAL(result, languages[cnt]);
        pos++;
        cnt++;
    }

    BOOST_REQUIRE_EQUAL(cnt, 5);
}

//test case 16
BOOST_AUTO_TEST_CASE(testExtractValueRepoDescriptions) {
    string rawData;
    string result;
    size_t pos = 0;
    size_t cnt = 0;
    string descriptions[] = {"null", "null", "The Death of a Pirate", 
        "COMP 4110 Software Engineering I: Design 1 Project", "test for our game"};

    BOOST_REQUIRE_NO_THROW(rawData = fetchGitHubData("smwfondu"));

    while ((pos = rawData.find("\"description\":", pos)) != string::npos) {
        BOOST_REQUIRE_NO_THROW(result = (extractValue(rawData.substr(pos), "description")));
        BOOST_REQUIRE_EQUAL(result, descriptions[cnt]);
        pos++;
        cnt++;
    }

    BOOST_REQUIRE_EQUAL(cnt, 5);
}

//test case 17
BOOST_AUTO_TEST_CASE(testExtractValueRepoURLs) {
    vector<string> rawData;
    vector<string> names = getRepoNames("smwfondu");
    size_t pos = 0;
    size_t cnt = 0;
    string urls[] = {"https://github.com/smwfondu/AbstractSpace", "https://github.com/smwfondu/DevDeck", 
        "https://github.com/smwfondu/PirateHorrorGame", "https://github.com/smwfondu/TargetShooter", 
        "https://github.com/smwfondu/testpart2"};

    BOOST_REQUIRE_NO_THROW(rawData = getRepoURLs("smwfondu", names));

    while (cnt < rawData.size()) {
        BOOST_REQUIRE_EQUAL(rawData[pos], urls[cnt]);
        pos++;
        cnt++;
    }
}

//test case 18
BOOST_AUTO_TEST_CASE(testFetchGitHubDataOnEmpty) {
    string result;

    BOOST_REQUIRE_NO_THROW(result = fetchGitHubData("ryanc3258"));
    BOOST_REQUIRE_EQUAL(result, "[]");
}

//test case 19
BOOST_AUTO_TEST_CASE(testGitHubIntegrationTotal) {
    string names[] = {"AbstractSpace", "DevDeck", "PirateHorrorGame", "TargetShooter", "testpart2"};
    string languages[] = {"C#", "C++", "C#", "C#", "Not specified"};
    string descriptions[] = {"No description", "No description", "The Death of a Pirate", 
        "COMP 4110 Software Engineering I: Design 1 Project", "test for our game"};
    string urls[] = {"https://github.com/smwfondu/AbstractSpace", "https://github.com/smwfondu/DevDeck", 
            "https://github.com/smwfondu/PirateHorrorGame", "https://github.com/smwfondu/TargetShooter", 
            "https://github.com/smwfondu/testpart2"};
    size_t cnt = 0;

    vector<string> namesV = getRepoNames("smwfondu");
    vector<string> languagesV = getRepoLanguages("smwfondu");
    vector<string> descriptionsV = getRepoDescriptions("smwfondu");
    vector<string> urlsV = getRepoURLs("smwfondu", namesV);

    for (size_t i = 0; i < namesV.size(); i++, cnt++) {
        BOOST_REQUIRE_EQUAL(namesV[i], names[cnt]);
        BOOST_REQUIRE_EQUAL(languagesV[i], languages[cnt]);
        BOOST_REQUIRE_EQUAL(descriptionsV[i], descriptions[cnt]);
        BOOST_REQUIRE_EQUAL(urlsV[i], urls[cnt]);
    }
}

//test case 20
BOOST_AUTO_TEST_CASE(testGitHubIntegrationTotalOnEmpty) {
    vector<string> namesV = getRepoNames("ryanc3258");
    vector<string> languagesV = getRepoLanguages("ryanc3258");
    vector<string> descriptionsV = getRepoDescriptions("ryanc3258");
    vector<string> urlsV = getRepoURLs("ryanc3258", namesV);

    BOOST_REQUIRE_EQUAL(namesV.empty(), true);
    BOOST_REQUIRE_EQUAL(languagesV.empty(), true);
    BOOST_REQUIRE_EQUAL(descriptionsV.empty(), true);
    BOOST_REQUIRE_EQUAL(urlsV.empty(), true);
}