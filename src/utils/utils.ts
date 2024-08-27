export function validateResponse(response: any): boolean {
  if (response && response.data && response.status === 200) {
    return true;
  } else {
    alert("serve error");
    return false;
  }
}

export function anotherUtilityFunction(param: string): string {
  return `Processed: ${param}`;
}
