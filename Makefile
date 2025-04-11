CC = g++
CFLAGS = --std=c++17 -pedantic -g
LIB = -lsfml-graphics -lsfml-audio -lsfml-window -lsfml-system -lboost_unit_test_framework -lcurl
# Your .hpp files
DEPS = 
# Your compiled .o files
OBJECTS = github_integration.o github_main.o
# The name of your program
PROGRAM = Github_integration

.PHONY: all clean lint


all: $(PROGRAM) test

# Wildcard recipe to make .o files from corresponding .cpp file
%.o: %.cpp $(DEPS)
	$(CC) $(CFLAGS) -c $<

test: unit_tests.o github_integration.o
	$(CC) $(CFLAGS) -o $@ $^ $(LIB)

$(PROGRAM): $(OBJECTS)
	$(CC) $(CFLAGS) -o $@ $^ $(LIB)

$(PROGRAM).a: $(OBJECTS)
	ar -rcs $@ $^

clean:
	rm *.o $(PROGRAM) test github_data.json
