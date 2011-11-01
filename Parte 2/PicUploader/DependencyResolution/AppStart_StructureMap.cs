using System.Web.Mvc;
using StructureMap;

namespace DependencyResolution
{
    public static class AppStart_StructureMap
    {
        public static void Start()
        {
            var container = (IContainer) IoC.Initialize();
            DependencyResolver.SetResolver(new SmDependencyResolver(container));
        }
    }
}