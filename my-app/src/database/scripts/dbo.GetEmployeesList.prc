SET QUOTED_IDENTIFIER ON
GO
/** Object: StoredProcedure [dbo].[GetEmployeesList] Date: 3/1/2021 **/
CREATE OR ALTER PROCEDURE [dbo].[GetEmployeesList]
@FirstName    VARCHAR(255) OUTPUT
@LastName     VARCHAR(255) OUTPUT
@StartsWithA  VARCHAR(1) OUTPUT

AS
BEGIN
  SET NOCOUNT ON;
  Select @FirstName = FirstName, @LastName = LastName, @StartsWithA = StartsWithA FROM dbo.GetEmployeesList
End;
