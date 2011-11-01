using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RepositoriesImplementation;
using StructureMap;
using PicUploader.DomainModel.Services;
using PicUploader.DomainModel.ServicesImplementation;
using PicUploader.DomainModel.ServicesRepositoryInterfaces;

namespace DependencyResolution
{
    public static class IoC
    {
        public static IContainer Initialize()
        {
            ObjectFactory.Initialize(x =>
                                         {
                                             x.Scan(scan =>
                                                        {
                                                            scan.TheCallingAssembly();
                                                            scan.WithDefaultConventions();
                                                        });

                                             x.For<IDrawingsService>().HttpContextScoped().Use<DrawingsService>();
                                             x.For<IDrawingsRepository>().HttpContextScoped().Use<DrawingsMemoryRepository>();
                                         });

            return ObjectFactory.Container;
        }
    }
}
