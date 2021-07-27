#include <stdio.h>
#include <stdbool.h>
#include <string.h>
#include <stdlib.h>

char paris(char c)
{
  if (c == ')')
  {
    return '(';
  }
  if (c == ']')
  {
    return '[';
  }
  if (c == '}')
  {
    return '{';
  }
  return '\0';
}

bool isValid(char *s)
{
  int len = strlen(s);

  if (len % 2 != 0)
  {
    return false;
  }
  char *stack = (char *)malloc((len + 1) * sizeof(char));
  memset(stack, 0, len + 1);
  int top = 0;
  for (int i = 0; i < len; i++)
  {
    char c = paris(s[i]);
    if (c)
    {
      if (!top || stack[top - 1] != c)
      {
        return false;
      }
      else
      {
        stack[--top] = 0;
      }
    }
    else
    {
      stack[top++] = s[i];
    }
  }

  return !strlen(stack);
}

int main () {
  printf("%d", isValid("()"));
}